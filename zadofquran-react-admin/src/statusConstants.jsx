import React from "react";
import { BlueCell } from "./ui/table/BlueCell";
import { OrangeCell } from "./ui/table/OrangeCell";
import { PinkCell } from "./ui/table/PinkCell";

export const lessonStatus = {
  'not_added': {
    'value': 'not_added',
    'text': 'لم تتم الإضافة بعد',
    'element': <PinkCell>لم تتم الإضافة بعد</PinkCell>,
  },
  'waiting': {
    'value': 'waiting',
    'text': 'تمت الإضافة',
    'element': <OrangeCell>تمت الإضافة</OrangeCell>,
  },
  'confirmed': {
    'value': 'confirmed',
    'text': 'نشطة',
    'element': <BlueCell>نشطة</BlueCell>,
  },
}
