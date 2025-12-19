
import ContactHead from "../../components/contactus/ContactHead";
import BranchLocator from "../../components/contactus/BranchLocator";
import { Suspense } from 'react';

export default function AdminCreateChitPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div>Loading branch information...</div>}>
      <ContactHead />
      <BranchLocator/>
      </Suspense>
    </div>
  )
}