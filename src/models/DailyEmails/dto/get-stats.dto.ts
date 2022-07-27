import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { toDateWithoutHours } from "./date.parser";



export class GetStatsDto {

    @IsNotEmpty()
    @Transform(toDateWithoutHours,  {toClassOnly: true})
    @IsDate()
    date: Date;

}
