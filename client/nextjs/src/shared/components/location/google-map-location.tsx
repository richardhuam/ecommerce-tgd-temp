import Paper from '../ui/paper';

interface GoogleMapLocationProps {
  src?: string;
}

const locationExample =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.1583091352!2d-74.11976373946234!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1588019781257!5m2!1sen!2sbd';

export default function GoogleMapLocation({ src = locationExample }: GoogleMapLocationProps) {
  return (
    <Paper>
      <h2 className="font-semibold text-20 uppercase mb-2 text-center">Visit our phisical store</h2>
      <iframe src={src} className="w-full h-400 xl:h-500" title="Google Maps Location" />
    </Paper>
  );
}
