import SubmitButton from '@/components/SubmitButton';

import { useSelector } from 'react-redux';

export default function PickUpListSubmit() {
  // useSelector
  const submitStatus = useSelector((state) => state.submitState.status);
  const currentOrderList = useSelector((state) => state.pickUpState.list);

  return (
    <SubmitButton
      type={submitStatus !== 'fulfilled' ? (currentOrderList.length !== 0 ? 'order' : 'back') : 'back'}
    />
  );
}
