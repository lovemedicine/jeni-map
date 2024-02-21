type InfoFieldProps = {
  name: string;
  value: string;
};

export default function InfoField({ name, value }: InfoFieldProps) {
  return (
    <div className="info-field">
      <strong>{name}</strong>: {value}
    </div>
  );
}
