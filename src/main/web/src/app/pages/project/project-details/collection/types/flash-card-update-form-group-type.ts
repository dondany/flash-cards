import {FormControl, FormGroup} from "@angular/forms";
import {FlashCardUpdateType} from "./flash-card-Update-type";

type FlashCardUpdateFormGroupType = FormGroup<{
  front: FormControl<FlashCardUpdateType['front']>,
  back: FormControl<FlashCardUpdateType['back']>,
}>;

export type FlashCardUpdateFormControlType = FlashCardUpdateFormGroupType['controls'];
export type FlashCardUpdateValueType = FlashCardUpdateFormGroupType['value'];
