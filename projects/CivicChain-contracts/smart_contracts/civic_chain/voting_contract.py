from algopy import ARC4Contract, arc4

class VotingContract(ARC4Contract):
    proposal_id: arc4.Uint64
    vote_count: arc4.Uint64
    asa_id: arc4.Uint64

    @arc4.abimethod(create=True)
    def create(self, proposal_id: arc4.Uint64, asa_id: arc4.Uint64):
        self.proposal_id = proposal_id
        self.asa_id = asa_id
        self.vote_count = arc4.Uint64(0)
