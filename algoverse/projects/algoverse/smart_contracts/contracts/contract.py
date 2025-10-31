from algopy.arc4 import ARC4Contract, abimethod
from algopy import UInt64, Bytes, Account, Txn, itxn, Global

class PotContract(ARC4Contract):
    creator: Account
    pot: UInt64

    def __init__(self) -> None:
        # On create: set creator and pot to 0
        self.creator = Txn.sender
        self.pot = UInt64(0)

    @abimethod
    def fund(self) -> None:
        # Users fund via a grouped payment -> app call (payment at index 0, app call at index 1)
        assert Global.group_size == UInt64(1)
        assert Txn.group_index == UInt64(1)
        payment = Txn.accounts(0)
        assert payment == Global.current_application_address
        assert Txn.amount > UInt64(0)
        self.pot += Txn.amount
  
    @abimethod
    
    def withdraw(self) -> None:
        # Only creator can withdraw
        assert Txn.sender == self.creator
        # Inner payment to creator; set fee=0 and rely on outer fee pooling
        itxn.Payment(
            amount=self.pot,
            receiver=Txn.sender,
            fee=UInt64(0)
        ).submit()
        self.pot = UInt64(0)
