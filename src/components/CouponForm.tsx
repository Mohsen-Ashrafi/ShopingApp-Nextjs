import TextField from "@/common/TextField";
import Loading from "@/common/Loading";
import Select, { MultiValue } from "react-select";
import DatePicker from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import en from "react-date-object/locales/gregorian_en";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "./Button";
import React from "react";
import DateObject from "react-date-object";
import { CouponType } from "@/types/coupon";

interface ProductOption {
  _id: string;
  title: string;
}

export interface CouponFormData {
  code?: string;
  amount?: string | number;
  usageLimit?: string | number;
}

interface Props {
  formData: CouponFormData;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: CouponType;
  setType: (value: CouponType) => void;
  options: ProductOption[];
  onChangeSelect: (value: MultiValue<ProductOption>) => void;
  expireDate: DateObject | null;
  setExpireDate: (date: DateObject | null) => void;
  isPending: boolean;
  defaultValue?: MultiValue<ProductOption>;
}

const CouponForm: React.FC<Props> = ({
  formData,
  onSubmit,
  onFormChange,
  type,
  setType,
  options,
  onChangeSelect,
  expireDate,
  setExpireDate,
  isPending,
  defaultValue = [],
}) => {
  return (
    <form
      className="space-y-4 max-w-sm text-sm sm:text-base"
      onSubmit={onSubmit}
    >
      <TextField
        label="Coupon Code"
        name="code"
        value={formData.code || ""}
        onChange={onFormChange}
      />
      <TextField
        label="Amount"
        name="amount"
        value={formData.amount?.toString() || ""}
        onChange={onFormChange}
      />
      <TextField
        label="Usage Limit"
        name="usageLimit"
        value={formData.usageLimit?.toString() || ""}
        onChange={onFormChange}
      />

      <div>
        <span className="block mb-1 sm:mb-2">Discount Type</span>
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <FormControlLabel
            value="percent"
            control={
              <Radio
                checked={type === "percent"}
                onChange={(e) => setType(e.target.value as CouponType)}
              />
            }
            label="Percent"
          />
          <FormControlLabel
            value="fixedProduct"
            control={
              <Radio
                checked={type === "fixedProduct"}
                onChange={(e) => setType(e.target.value as CouponType)}
              />
            }
            label="Fixed Price"
          />
        </div>
      </div>

      <div>
        <label htmlFor="products" className="block mb-1 sm:mb-2">
          Include Products
        </label>
        <Select
          id="products"
          isMulti
          onChange={onChangeSelect}
          options={options}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={defaultValue}
        />
      </div>

      <div>
        <span className="block mb-1 sm:mb-2">Expiration Date</span>
        <DatePicker
          value={expireDate}
          format="YYYY/MM/DD"
          calendar={gregorian}
          locale={en}
          calendarPosition="bottom-left"
          onChange={setExpireDate}
          render={(value, openCalendar) => (
            <TextField
              label="Expire Date"
              onClick={openCalendar}
              value={value}
              fullWidth
              size="small"
            />
          )}
        />
      </div>

      <div className="my-4">
        {isPending ? <Loading /> : <Button type="submit">Confirm</Button>}
      </div>
    </form>
  );
};

export default CouponForm;
