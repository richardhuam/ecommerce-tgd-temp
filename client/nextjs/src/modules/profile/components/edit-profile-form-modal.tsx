import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/shared/components/ui/button';
import Input from '@/shared/components/ui/input';
import CountriesSelect from '@/shared/components/ui/selects/countries-select';
import { CountriesProps, countryList } from '@/shared/constants/countries';
import { useAuth } from '@/shared/contexts/auth.context';
import { IUser } from '@/shared/models/account.model';
import { useUpdateUserById } from '@/shared/queries/user/user.query';
import { IUpdateUserByIdApiParams } from '@/shared/services/user/user.service.types';
import { errorMessageResolver } from '@/shared/utils/api/api-error-message-resolver';

import { editProfileFormValidation } from '../utils/edit-profile-form-validation';

type EditProfileModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

export default function EditProfileFormModal({ isOpen, toggleModal }: EditProfileModalProps) {
  const { me, setMe } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<CountriesProps>((me?.address?.country as CountriesProps) ?? countryList[0]);
  const updateUser = useUpdateUserById();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IUpdateUserByIdApiParams>({
    resolver: yupResolver(editProfileFormValidation),
    defaultValues: {
      firstName: me.firstName ?? '',
      lastName: me.lastName ?? '',
      email: me.email ?? '',
      phone: me?.phone ?? '',
      address: {
        country: {
          code: me.address?.country.code ?? selectedCountry.code,
          name: me.address?.country.name ?? selectedCountry.name,
        },
        city: me.address?.city ?? '',
        street: me.address?.street ?? '',
        state: me.address?.state ?? '',
        zip: me.address?.zip ?? '',
      },
    },
  });

  function onSubmit(values: IUpdateUserByIdApiParams) {
    const formData = { ...values, _id: me._id } as IUser;
    updateUser.mutate(formData, {
      onSuccess: data => {
        setMe(data.data);
        toggleModal();
        toast.success('Profile updated successfully', {
          duration: 5000,
        });
      },
      onError: error => {
        const errorMessage = errorMessageResolver(error);
        toast.error(errorMessage);
      },
    });
  }

  function handleClose() {
    reset();
    toggleModal();
    setSelectedCountry((me?.address?.country as CountriesProps) ?? countryList[0]);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-modal" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                    Your Profile
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="w-full space-y-4">
                      <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
                        <div className="w-full">
                          <Input
                            label="First Name"
                            type="text"
                            placeholder="John"
                            error={errors.firstName?.message}
                            {...register('firstName')}
                          />
                        </div>
                        <div className="w-full">
                          <Input
                            label="Last Name"
                            type="text"
                            placeholder="Smith"
                            error={errors.lastName?.message}
                            {...register('lastName')}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
                        <div className="w-full">
                          <Input label="Email" type="email" placeholder="john@gmail.com" disabled {...register('email')} />
                        </div>
                        <div className="w-full">
                          <Input
                            label="Phone"
                            type="text"
                            placeholder="+1 8393 9384 4441"
                            error={errors.phone?.message}
                            {...register('phone')}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
                        <div className="w-full">
                          <Input
                            label="Street"
                            type="text"
                            placeholder="Street"
                            error={errors.address?.street?.message}
                            {...register('address.street')}
                          />
                        </div>
                        <div className="w-full">
                          <Input
                            label="City"
                            type="text"
                            placeholder="City"
                            error={errors.address?.city?.message}
                            {...register('address.city')}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
                        <div className="w-full">
                          <Input
                            label="State"
                            type="text"
                            placeholder="State"
                            error={errors.address?.state?.message}
                            {...register('address.state')}
                          />
                        </div>
                        <div className="w-full">
                          <Input
                            label="Zip Code"
                            type="text"
                            placeholder="Zip Code"
                            error={errors.address?.zip?.message}
                            {...register('address.zip')}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
                        <div className="w-full">
                          <Controller
                            name="address.country"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange } }) => {
                              return (
                                <CountriesSelect
                                  onChange={onChange}
                                  selectedCountry={selectedCountry}
                                  setSelectedCountry={setSelectedCountry}
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-20 flex items-center justify-end gap-4">
                    <Button type="button" variant="outline" color="error" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button loading={updateUser.isLoading} disabled={updateUser.isLoading} type="submit" variant="outline">
                      Submit
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </form>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
