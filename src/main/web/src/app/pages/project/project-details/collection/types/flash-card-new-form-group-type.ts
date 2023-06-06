import {FormControl, FormGroup} from "@angular/forms";
import {FlashCardNewType} from "./flash-card-new-type";

type FlashCardNewFormGroupType = FormGroup<{
  front: FormControl<FlashCardNewType['front']>,
  back: FormControl<FlashCardNewType['back']>,
}>;

export type FlashCardNewFormControlType = FlashCardNewFormGroupType['controls'];
export type FlashCardNewValueType = FlashCardNewFormGroupType['value'];
