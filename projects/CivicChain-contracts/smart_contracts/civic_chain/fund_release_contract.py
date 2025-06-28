from algopy import ARC4Contract, arc4
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
