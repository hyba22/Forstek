export class CreateStartupDto {
    readonly name: string;
    readonly duration: string;
    readonly description?: string;
    readonly foundedYear?: number;
  }