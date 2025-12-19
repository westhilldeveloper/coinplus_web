export default function PlanCard({ plan }) {
  return (
    <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{plan.title}</h3>
        <div className="text-sm text-slate-500">{plan.tenure} months</div>
      </div>
      <p className="mt-2 text-slate-600 text-sm">{plan.summary}</p>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">Monthly</div>
          <div className="font-medium">₹{plan.monthly}</div>
        </div>
        <a href={`/plans/${plan.id}`} className="text-sm px-3 py-1 border rounded">View</a>
      </div>
    </div>
  );
}
