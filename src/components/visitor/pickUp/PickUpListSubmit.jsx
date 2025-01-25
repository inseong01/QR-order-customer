import SubmitButton from '@/components/SubmitButton';
import { useBoundStore } from '@/lib/store/useBoundStore';

export default function PickUpListSubmit() {
  // store
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);
  const isNext = useBoundStore((state) => state.submitState.isNext);

  return <SubmitButton type={isNext ? 'back' : currentOrderList.length !== 0 ? 'order' : 'back'} />;
}
