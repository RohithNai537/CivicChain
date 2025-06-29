import React from 'react';
import { CreateProposalForm } from '@/components/Forms/CreateProposalForm';

const CreateProposal = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Proposal</h1>
          <p className="text-gray-600">
            Submit a proposal for community review and voting on the blockchain
          </p>
        </div>
        
        <CreateProposalForm />
      </div>
    </div>
  );
};

export default CreateProposal;
