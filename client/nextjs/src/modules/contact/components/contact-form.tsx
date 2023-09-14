import { useForm } from 'react-hook-form';

import Button from '@/shared/components/ui/button';
import Input from '@/shared/components/ui/input';
import Paper from '@/shared/components/ui/paper';
import TextArea from '@/shared/components/ui/text-area';
import { IContactFormValues } from '@/shared/models/contact.model';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactFormValues>();

  const onSubmit = (values: IContactFormValues) => {
    console.log(values);
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="font-semibold text-20 uppercase mb-2 text-center">Contact Form</h2>
        <div className="w-full space-y-4">
          <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
            <div className="w-full">
              <Input label="First Name" type="text" placeholder="John" error={errors.firstName?.message} {...register('firstName')} />
            </div>
            <div className="w-full">
              <Input label="Last Name" type="text" placeholder="Smith" error={errors.lastName?.message} {...register('lastName')} />
            </div>
          </div>
          <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
            <div className="w-full">
              <Input label="Email" type="email" placeholder="john@gmail.com" error={errors.email?.message} {...register('email')} />
            </div>
            <div className="w-full">
              <Input
                label="Phone"
                type="text"
                placeholder="+1 8393 9384 4441"
                error={errors.phoneNumber?.message}
                {...register('phoneNumber')}
              />
            </div>
          </div>
          <div>
            <Input label="Subject" type="text" placeholder="Subject" error={errors.subject?.message} {...register('subject')} />
          </div>
          <div>
            <TextArea
              label="Message"
              type="text"
              placeholder="Write your message"
              error={errors.message?.message}
              {...register('message')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-primary">Call us:</p>
              <span className="text-gray-700">+1 445 552 990</span>
            </div>
            <Button type="submit">Send Message</Button>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default ContactForm;
