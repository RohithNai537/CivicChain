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

