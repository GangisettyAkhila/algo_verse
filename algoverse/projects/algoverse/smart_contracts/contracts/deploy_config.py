name: algogaming-hub
version: 1.0

deploy:
  contracts:
    - name: CasinoFund
      approval: ./contract.py
      clear: ./contract.py
      type: app
      on_complete_action: noop
      create_args: []
      update_args: []
      delete_args: []
      clear_args: []
