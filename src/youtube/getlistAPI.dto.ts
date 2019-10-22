import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator/decorator/decorators';

export class GetApiYtbDTO {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsNumber()
    @IsOptional()
    limit: number;
}
