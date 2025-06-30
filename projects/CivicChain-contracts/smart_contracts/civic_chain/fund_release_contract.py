from algopy import ARC4Contract, arc4
from algopy import Txn, Assert, InnerTxnBuilder, TxnField, TxnType
from algopy.arc4 import abimethod

class FundReleaseContract(ARC4Contract):
    admin: arc4.Address
    vote_contract_id: arc4.Uint64
    required_votes: arc4.Uint64
    budget: arc4.Uint64

    @arc4.abimethod(create=True)
    def create(self, admin: arc4.Address, vote_contract_id: arc4.Uint64, budget: arc4.Uint64, required_votes: arc4.Uint64):
        self.admin = admin
        self.vote_contract_id = vote_contract_id
        self.budget = budget
        self.required_votes = required_votes

   @arc4.abimethod()
    def release(self, receiver: arc4.Address, vote_count: arc4.Uint64):
        Assert(Txn.sender == self.admin)
        Assert(vote_count >= self.required_votes)

        InnerTxnBuilder.Begin()
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.Payment,
            TxnField.amount: self.budget.unwrap(),
            TxnField.receiver: receiver.encode()
        })
        InnerTxnBuilder.Submit()


@abimethod()
def update_budget(self, new_budget: arc4.Uint64):
    Assert(Txn.sender == self.admin, comment="Only admin can update budget")
    self.budget = new_budget

