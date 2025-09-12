from pyteal import *;

def approval_program():
    creator_key = Bytes("creator")
    pot_key = Bytes("pot")

    on_create = Seq(
        App.globalPut(creator_key, Txn.sender()),
        App.globalPut(pot_key, Int(0)),
        Approve(),
    )

    # Users fund via a grouped payment -> app call (payment at index 0, app call at index 1)
    on_fund = Seq(
        Assert(
            And(
                Global.group_size() == Int(2),
                Txn.group_index() == Int(1),                    # this app call must be second
                Gtxn[0].type_enum() == TxnType.Payment,
                Gtxn[0].receiver() == Global.current_application_address(),
                Gtxn[0].amount() > Int(0),
            )
        ),
        App.globalPut(pot_key, App.globalGet(pot_key) + Gtxn[0].amount()),
        Approve(),
    )

    on_withdraw = Seq(
        # Only creator
        Assert(Txn.sender() == App.globalGet(creator_key)),
        # Ensure creator is in accounts[] for the inner txn (optional but safer)
        Assert(Txn.accounts.length() > Int(0)),  # caller should pass their addr in accounts[1]
        # Inner payment to creator; set fee=0 and rely on outer fee pooling
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.Payment,
            TxnField.receiver: Txn.sender(),
            TxnField.amount: App.globalGet(pot_key),
            TxnField.fee: Int(0),
        }),
        InnerTxnBuilder.Submit(),
        App.globalPut(pot_key, Int(0)),
        Approve(),
    )

    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.application_args[0] == Bytes("fund"), on_fund],
        [Txn.application_args[0] == Bytes("withdraw"), on_withdraw],
    )
    return program

def clear_program():
    return Approve()