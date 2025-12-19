
import BranchLocator from "../../components/contactus/BranchLocator";
import { Suspense } from 'react';

export default function AdminCreateChitPage() {
  return (
    <div className="container mx-auto py-8">
       <Suspense fallback={<div>Loading branch information...</div>}>
      <BranchLocator/>
      </Suspense>
    </div>
  )
}