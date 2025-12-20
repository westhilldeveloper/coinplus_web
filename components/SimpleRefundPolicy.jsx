import React from 'react';

const SimpleRefundPolicy = () => {
  const policies = [
    {
      number: "1",
      title: "Refund on failed transaction",
      content: "If an amount is debited from a customer during an online transaction and the transaction was not successful, the refund will be initiated automatically, and there is no guarantee whatsoever for the timelines of the refund reaching customers accounts. Finovest Chits and Kuries Pvt Ltd shall not be liable for any such delay in refund. However Finovest Chits and Kuries Pvt Ltd shall take all efforts to confirm the refund."
    },
    {
      number: "2",
      title: "Refund on Cancellation",
      content: "We are here to assist customers who are not entirely happy with our service. Upon raising a cancellation request after joining a chit group, a refund of the paid amount can be processed if the chit is not commenced without deducting any commission. However, onboarding charge shall not be refunded. If the cancellation is submitted after commencement of Chit group, the paid amount will be refunded after deducting interest (91.2% pa for the period till the substitution has been made or within fifteen days of termination chit (Chit Fund Act 1982 Section 30)."
    },
    {
      number: "3",
      title: "Refund on Excess Payments",
      content: "If a subscriber attempted to make payments through online mode and transactions were made more than once, Finovest Chits and Kuries Pvt Ltd have received more than once, then the customer can claim the excess amount within 15 days of date of transaction. Refund will be initiated by Finovest Chits and Kuries Pvt Ltd on receipt of such request within the stipulated period and after verifying the bank records. If the excess amount paid by a subscriber remains unclaimed after 15 days, it will be adjusted to the future instalment."
    },
    {
      number: "4",
      title: "Purpose of Payment Gateway (Cashfree/Omnivare)",
      content: "The purpose of payment Gateway is to help subscribers make their payments online without visiting the nearest service centre/branch. It also serves the agents to collect the instalment through Collection App either by Cash or Online (UPI)."
    }
  ];

  return (
    <div className="min-h-screen w-full py-8 px-4">
      {/* Header */}
      
        <div 
          className="text-center mb-6 py-12 relative overflow-hidden"
          style={{
            backgroundImage: 'url(/images/terms.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              REFUND AND  <span className="text-yellow-300">CANCELLATION POLICY</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-6"></div>
            <p className="text-white/90 text-lg max-w-3xl mx-auto px-4">
              Protecting your personal information is our top priority. Learn how we collect, use, and safeguard your data.
            </p>
          </div>
        </div>

      {/* Policies List */}
      <div className="max-w-full mx-auto space-y-6">
        {policies.map((policy, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">{policy.number}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{policy.title}</h3>
                <p className="text-gray-700">{policy.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default SimpleRefundPolicy;