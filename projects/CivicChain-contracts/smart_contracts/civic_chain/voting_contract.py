from algopy import ARC4Contract, arc4
from algopy import Txn, App, Int, Assert, AssetHolding
from algopy.arc4 import abimethod

class VotingContract(ARC4Contract):
    proposal_id: arc4.Uint64
    vote_count: arc4.Uint64
    asa_id: arc4.Uint64

    @arc4.abimethod(create=True)
    def create(self, proposal_id: arc4.Uint64, asa_id: arc4.Uint64):
        self.proposal_id = proposal_id
        self.asa_id = asa_id
        self.vote_count = arc4.Uint64(0)

    @arc4.abimethod()
    def vote(self):
        voted_key = arc4.Bytes("voted_" + Txn.sender.encode())
        Assert(App.localGet(Txn.sender, voted_key) == Int(0))  # check if already voted

        balance = AssetHolding.balance(Txn.sender, self.asa_id.unwrap())
        Assert(balance.hasValue())
        Assert(balance.value() > Int(0))  # check token ownership

        App.localPut(Txn.sender, voted_key, Int(1))  # mark voted
        self.vote_count += arc4.Uint64(1)  # increment vote count
