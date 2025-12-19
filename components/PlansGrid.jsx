import PlanCard from './PlanCard';

const plans = [
  { id: 'education', title: 'Education Chit', tenure: 24, monthly: 2500, summary: 'Save for education with flexible auction' },
  { id: 'home', title: 'Home Chit', tenure: 36, monthly: 5000, summary: 'Plan for home down payment' },
  { id: 'wedding', title: 'Wedding Chit', tenure: 18, monthly: 3500, summary: 'Funds for wedding expenses' },
  { id: 'business', title: 'Business Chit', tenure: 30, monthly: 8000, summary: 'Working capital with easy access' }
];

export default function PlansGrid() {
  return (
    <section id="plans" className="py-8">
      <h2 className="text-2xl font-bold">Our Popular Plans</h2>
      <p className="mt-2 text-slate-600">Choose a plan that fits your goal. Participate in auctions or bids to access lump sums.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map(p => <PlanCard key={p.id} plan={p} />)}
      </div>
    </section>
  );
}
