from algopy import ARC4Contract, arc4, Txn, Assert

class ProposalContract(ARC4Contract):
    admin: arc4.Address
    title: arc4.String
    description: arc4.String
    budget: arc4.Uint64

    @arc4.abimethod(create=True)
    def create(self, admin: arc4.Address, title: arc4.String, description: arc4.String, budget: arc4.Uint64):
        self.admin = admin
        self.title = title
        self.description = description
        self.budget = budget

    @arc4.abimethod()
    def update_proposal(self, title: arc4.String, description: arc4.String, budget: arc4.Uint64):
        Assert(Txn.sender == self.admin)
        self.title = title
        self.description = description
        self.budget = budget
