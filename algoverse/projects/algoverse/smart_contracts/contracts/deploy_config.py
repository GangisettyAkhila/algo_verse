# smart_contracts/deploy_config.py

deploy_config = {
    "name": "algoverse",
    "version": "1.0",
    "deploy": {
        "contracts": [
            {
                "name": "CasinoFund",
                # Use the compiled artifact, e.g., .arc32.json or .teal, not the .py file
                "approval": "./artifacts/CasinoFund.approval.teal",
                "clear": "./artifacts/CasinoFund.clear.teal",
                "type": "app",
                "on_complete_action": "noop",
                "create_args": [],
                "update_args": [],
                "delete_args": [],
                "clear_args": [],
            }
        ]
    }
}

def deploy() -> None:
    # Implement deployment logic here, or leave empty for build to pass
    pass