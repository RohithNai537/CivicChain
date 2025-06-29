import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { VoteButton } from '@/components/Proposals/VoteButton';
import { useProposals } from '@/hooks/useProposals';
import { Calendar, DollarSign, Users, Clock } from 'lucide-react';

const ProposalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { proposals } = useProposals();
  
  const proposal = proposals.find(p => p.id === id);

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Proposal Not Found</h2>
          <p className="text-gray-600">The proposal you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const approvalRate = proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0;
  const quorumProgress = (proposal.totalVotes / proposal.quorum) * 100;
  const daysLeft = Math.ceil((new Date(proposal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'infrastructure': return '🏗️';
      case 'health': return '🏥';
      case 'education': return '📚';
      case 'environment': return '🌱';
      default: return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'passed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getCategoryIcon(proposal.category)}</span>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {proposal.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(proposal.status)}>
                      {proposal.status.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-500 capitalize">{proposal.category}</span>
                    <span className="text-sm text-gray-500">By {proposal.creator}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Proposal Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {proposal.description}
                </p>
              </CardContent>
            </Card>

            {/* Voting Results */}
            <Card>
              <CardHeader>
                <CardTitle>Voting Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{proposal.votesFor.toLocaleString()}</div>
                    <div className="text-green-700">Votes For</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{proposal.votesAgainst.toLocaleString()}</div>
                    <div className="text-red-700">Votes Against</div>
                  </div>
                </div>

                {proposal.status === 'active' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Approval Rate</span>
                        <span className="font-medium">{approvalRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={approvalRate} className="h-3" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Quorum Progress</span>
                        <span className="font-medium">{Math.min(quorumProgress, 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(quorumProgress, 100)} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">
                        {proposal.totalVotes.toLocaleString()} of {proposal.quorum.toLocaleString()} required votes
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Voting Interface */}
            {proposal.status === 'active' && (
              <VoteButton proposalId={proposal.id} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Info */}
            <Card>
              <CardHeader>
                <CardTitle>Proposal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-semibold">${proposal.budget.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Total Votes</p>
                    <p className="font-semibold">{proposal.totalVotes.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-semibold">{new Date(proposal.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-semibold">{new Date(proposal.deadline).toLocaleDateString()}</p>
                    {proposal.status === 'active' && (
                      <p className="text-xs text-red-600">
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Voting ends today'}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Info */}
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Network</p>
                  <p className="font-medium">Algorand Mainnet</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contract ID</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                    {proposal.id}...APP
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Voting ASA</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                    CIVIC-{proposal.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;
