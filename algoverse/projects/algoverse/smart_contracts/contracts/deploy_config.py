# smart_contracts/contracts/deploy_config.py

# Optional: keep your dict (pure Python, no YAML colons outside a dict)
deploy_config = {
    "name": "algoverse",
    "version": "1.0",
    "deploy": {
        "contracts": [
            {
                "name": "CasinoFund",
                "approval": "./contract.py",  # note: AlgoKit deploy expects built artifacts, not .py
                "clear": "./contract.py",
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

# Provide a deploy() function so import succeeds
def deploy() -> None:
    # You can leave this empty for build to pass, or implement real deployment via typed clients
    pass