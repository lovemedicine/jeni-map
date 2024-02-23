type InfoFieldProps = {
  name: string;
  value: string;
};

export default function InfoField({ name, value }: InfoFieldProps) {
  return (
    <div className="mt-3">
      <strong>{name}</strong>: {value}
    </div>
  );
}
