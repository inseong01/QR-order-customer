import SubmitButton from '@/components/SubmitButton';
import { useBoundStore } from '@/lib/store/useBoundStore';

export default function PickUpListSubmit() {
  // store
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  // variant
  const isAbleGoBack = submitStatus === 'fulfilled' || submitStatus === 'rejected';

  return <SubmitButton type={isAbleGoBack ? 'back' : currentOrderList.length !== 0 ? 'order' : 'back'} />;
}
