'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import StepIndicator from '@/components/shared/step-indicator';
import { useTranslations } from 'next-intl';
import AddressForm from './address-form';
import Map from './map';
import { useAddAddress } from '@/hooks/addresses/use-add-address';
import { AddressSubmissionValue } from '@/lib/schemes/address.schema';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateAddress } from '@/hooks/addresses/use-update-address';
import { Address } from '@/lib/types/addresses';

// props
interface AddressWizardProps {
  mode: 'add' | 'update';
  initialData: Address | null;
  setView: React.Dispatch<React.SetStateAction<'list' | 'add' | 'update'>>;
}

export default function AddressWizard({ mode, initialData, setView }: AddressWizardProps) {
  // Translation
  const t = useTranslations('Addresses');

  // States
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Address | null>(initialData);
  const [location, setLocation] = useState<{ lat: string; lng: string } | null>(
    initialData ? { lat: initialData.lat, lng: initialData.long } : null
  );

  // Hooks
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mutation
  const { addAddress, isPending } = useAddAddress();
  const { updateAddress } = useUpdateAddress();

  // Function
  const handleSubmit = () => {
    // In case no data found
    if (!formData || !location) {
      toast({
        description: 'Please fill in all fields and select your location.',
        variant: 'destructive',
      });
      return;
    }
    // To omit the id before send the data to the BE
    const { _id, ...rest } = formData;
    const newAddress: AddressSubmissionValue = {
      ...rest,
      lat: location.lat,
      long: location.lng,
    };

    // In case of add a new address
    if (mode === 'add') {
      addAddress(newAddress, {
        onSuccess: () => {
          toast({ description: 'Address added successfully!', variant: 'default' });
          // Refetch addresses after toast
          queryClient.invalidateQueries({ queryKey: ['addresses'] });
          setLocation(null);
          setFormData(null);
          setView('list');
        },
        onError: () => {
          toast({ description: 'Failed to add address', variant: 'destructive' });
        },
      });

      // In case of updating existing address
    } else {
      
      // Case of updating address
      updateAddress(
        { values: newAddress, addressId: initialData!._id },
        {
          onSuccess: () => {
            toast({ description: 'Address updated successfully!', variant: 'default' });
            // Refetch addresses after toast
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            setLocation(null);
            setFormData(null);
            setView('list');
          },
          onError: () => {
            toast({ description: 'Failed to update address', variant: 'destructive' });
          },
        }
      );
    }
  };

  return (
    <div className="mx-auto">
      {/* Step Indicator */}
      <div className="mb-4 mt-2">
        <StepIndicator currentStep={step} />
      </div>

      {/* Step 1 => Form to update or add  */}
      {step === 1 && (
        <div>
          {/* add new address form || update new address form*/}
          <h2 className="font-medium text-maroon-600 text-2xl pb-3 border-b border-zinc-200 mb-4">
            {t('enter-address-details')}
          </h2>

          {/* Form */}
          <AddressForm
            intialValues={formData}
            onNext={(data) => {
              setFormData(data);
              setStep(2);
            }}
          />
        </div>
      )}

      {/* Step 2 => Form to add or update the location */}
      {step === 2 && (
        <div>
          {/* Title */}
          <div className="flex items-center border-b pb-3 border-zinc-200 mb-4">
            <Button
              className="bg-maroon-600 rounded-full w-[2.1875rem] h-[2.1875rem] flex items-center justify-center"
              onClick={() => setStep(1)}
            >
              <ArrowLeft size={20} className="text-white" />
            </Button>
            <h2 className="font-medium text-2xl text-maroon-600 ms-4">{t('find-your-location')}</h2>
          </div>

          {/* Google maps */}
          <div className=" bg-gray-200 flex items-center justify-center mb-4">
            <Map
              onLocationSelect={(lat, lng) => {
                setLocation({ lat: lat.toString(), lng: lng.toString() });
              }}
            />
          </div>

          {/* Submission Button */}
          <Button
            onClick={handleSubmit}
            loading={isPending}
            disabled={isPending}
            variant="default"
            className="w-full mt-11"
          >
            {t('add-address-form')}
          </Button>
        </div>
      )}
    </div>
  );
}
