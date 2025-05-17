interface StatsCardProps {
    title: string;
    value: number;
    label: string;
  }
  
  export const StatsCard = ({ title, value, label }: StatsCardProps) => {
    return (
      <div className="card shadow-custom mb-4">
        <div className="card-body">
          <h6 className="card-title text-muted mb-3">{title}</h6>
          <h3 className="stats-number">{value.toLocaleString()}</h3>
          <p className="stats-label mb-0">{label}</p>
        </div>
      </div>
    );
  };