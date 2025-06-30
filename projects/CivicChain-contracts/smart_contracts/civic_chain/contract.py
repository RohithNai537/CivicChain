from algopy import ARC4Contract, arc4

class CivicChain(ARC4Contract):
    admin: arc4.Address
    proposal: arc4.String
    budget: arc4.Uint64
    vote_count: arc4.Uint64

    @arc4.abimethod(create=True)
    def create(self, admin: arc4.Address, proposal: arc4.String, budget: arc4.Uint64):
        self.admin = admin
        self.proposal = proposal
        self.budget = budget
        self.vote_count = arc4.Uint64(0)

    @arc4.abimethod()
    def update_proposal(self, proposal: arc4.String, budget: arc4.Uint64):
        from algopy import Txn, Assert
        Assert(Txn.sender == self.admin)
        self.proposal = proposal
        self.budget = budget
        self.vote_count = arc4.Uint64(0)

    @arc4.abimethod()
    def vote(self):
        from algopy import Txn, Assert, App, Int
        voted_key = arc4.Bytes("voted_" + Txn.sender.encode())
        Assert(App.localGet(Txn.sender, voted_key) == Int(0))
        App.localPut(Txn.sender, voted_key, Int(1))
        self.vote_count += arc4.Uint64(1)

    @arc4.abimethod()
    def release_funds(self, receiver: arc4.Address):
        from algopy import Txn, Assert, InnerTxnBuilder, TxnField, TxnType
        quorum = arc4.Uint64(3)
        Assert(self.vote_count >= quorum)
        Assert(Txn.sender == self.admin)

        InnerTxnBuilder.Begin()
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.Payment,
            TxnField.amount: self.budget.unwrap(),
            TxnField.receiver: receiver.encode()
        })
        InnerTxnBuilder.Submit()

    @arc4.abimethod()
    def reset_votes(self):
     from algopy import Txn, Assert

      Assert(Txn.sender == self.admin, comment="Only admin can reset votes")
      self.vote_count = arc4.Uint64(0)

   @arc4.abimethod()
   def has_voted(self) -> arc4.Bool:
     from algopy import Txn, App, Int

    voted_key = arc4.Bytes("voted_" + Txn.sender.encode())
    status = App.localGet(Txn.sender, voted_key)
    return arc4.Bool(status == Int(1))

  @arc4.abimethod()
   def get_voter_status(self, addr: arc4.Address) -> arc4.Bool:
     from algopy import App, Int
     voted_key = arc4.Bytes("voted_" + addr.encode())
     return arc4.Bool(App.localGet(addr, voted_key) == Int(1))

@arc4.abimethod()
def get_proposal(self) -> arc4.Tuple[arc4.String, arc4.Uint64, arc4.Uint64]:
    return (self.proposal, self.budget, self.vote_count)

@arc4.abimethod()
def change_admin(self, new_admin: arc4.Address):
    from algopy import Txn, Assert
    Assert(Txn.sender == self.admin, comment="Only admin can change admin")
    self.admin = new_admin

quorum: arc4.Uint64  # Add this as a global variable in class

@arc4.abimethod(create=True)
def create(self, admin: arc4.Address, proposal: arc4.String, budget: arc4.Uint64, quorum: arc4.Uint64):
    self.admin = admin
    self.proposal = proposal
    self.budget = budget
    self.vote_count = arc4.Uint64(0)
    self.quorum = quorum

@arc4.abimethod()
def update_quorum(self, new_quorum: arc4.Uint64):
    from algopy import Txn, Assert
    Assert(Txn.sender == self.admin, comment="Only admin can update quorum")
    self.quorum = new_quorum
    
@arc4.abimethod()
def withdraw_unspent(self, amount: arc4.Uint64, receiver: arc4.Address):
    from algopy import Txn, Assert, InnerTxnBuilder, TxnField, TxnType
    Assert(Txn.sender == self.admin, comment="Only admin can withdraw")
    
    InnerTxnBuilder.Begin()
    InnerTxnBuilder.SetFields({
        TxnField.type_enum: TxnType.Payment,
        TxnField.amount: amount.unwrap(),
        TxnField.receiver: receiver.encode()
    })
    InnerTxnBuilder.Submit()

@arc4.abimethod()
def clear_voter_status(self, addr: arc4.Address):
    from algopy import Txn, Assert, App, Int
    Assert(Txn.sender == self.admin, comment="Only admin can clear vote status")
    voted_key = arc4.Bytes("voted_" + addr.encode())
    App.localPut(addr, voted_key, Int(0))





