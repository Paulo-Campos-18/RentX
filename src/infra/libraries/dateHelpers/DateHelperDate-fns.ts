import { injectable } from "inversify";
import { IDateHelper } from "../../../domain/dateHelpers/IDateHelper";
import { differenceInHours } from "date-fns";

@injectable()
export class DateHelperDate_fns implements IDateHelper{
    differenceInHours(endDate: Date, initDate: Date): number {
        return differenceInHours(endDate,new Date());
    }

}