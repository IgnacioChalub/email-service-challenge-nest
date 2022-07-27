import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class GetStatsDto {

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date;

}