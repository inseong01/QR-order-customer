import SubmitButton from '@/components/SubmitButton';
import { useBoundStore } from '@/lib/store/useBoundStore';

export default function PickUpListSubmit() {
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const currentOrderList = useBoundStore((state) => state.pickUpState.list);

  return (
    <SubmitButton
      type={submitStatus !== 'fulfilled' ? (currentOrderList.length !== 0 ? 'order' : 'back') : 'back'}
    />
  );
}
