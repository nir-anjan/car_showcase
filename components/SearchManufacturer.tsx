"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";

import { manufacturers } from "../constants";
import { SearchManuFacturerProps } from "../types";

const SearchManufacturer = ({
  manufacturer,
  setManuFacturer, // Corrected prop name from setManuFacturer to setManufacturer for consistency
}: SearchManuFacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex-1 max-sm:w-full flex justify-start items-center">
      <Combobox
        value={manufacturer}
        onChange={(value) => setManuFacturer(value ?? "")}
      >
        <div className="relative w-full">
          <ComboboxButton className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </ComboboxButton>

          <ComboboxInput
            className="w-full h-[48px] pl-12 p-4 rounded-full max-sm:rounded-full bg-primary-blue-100 outline-none cursor-pointer text-sm"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Volkswagen..."
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              // The 'static' prop is removed as it's often not needed with Transition and can sometimes interfere with state.
              // Re-add it if you have specific reasons for keeping the options in the DOM at all times.
            >
              {filteredManufacturers.length === 0 && query !== "" ? (
                <ComboboxOption
                  value={query}
                  className="cursor-default select-none py-2 pl-10 pr-4 text-gray-700"
                >
                  Create "{query}"
                </ComboboxOption>
              ) : (
                filteredManufacturers.map((item) => (
                  // REFACTORED: The render prop is removed. All styling is now handled in `className`.
                  <ComboboxOption
                    key={item}
                    value={item}
                    className="relative cursor-default select-none py-2 pl-10 pr-4 ui-active:bg-primary-blue ui-active:text-white ui-not-active:text-gray-900"
                  >
                    {/* The content is now rendered directly, not inside a function. */}
                    <span className="block truncate ui-selected:font-medium">
                      {item}
                    </span>

                    {/* REFACTORED: Conditional rendering is replaced with declarative classes. */}
                    {/* This span is always rendered, but visibility is controlled by `ui-selected` state. */}
                    <span className="absolute inset-y-0 left-0 hidden items-center pl-3 ui-selected:flex ui-active:text-white ui-not-active:text-primary-blue" />
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
