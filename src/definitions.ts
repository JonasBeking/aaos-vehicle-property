export interface VehiclePropertyPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
