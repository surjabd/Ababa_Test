import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public director: string;

  @IsString()
  public actor: string;
}
