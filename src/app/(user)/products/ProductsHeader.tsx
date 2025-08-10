"use client";

import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";
import { Category } from "@/types/category";

interface ProductsHeaderProps {
  categories: Category[];
}

export default function ProductsHeader({ categories }: ProductsHeaderProps) {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <>
      {/*  Products Header  */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2 min-w-[120px]">
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setOpenFilter(true)}
          >
            Filter
          </Button>
        </div>
        {/* Sorting products */}
        <div className="min-w-[150px]">
          <ProductsSort />
        </div>
      </div>

      {/*  Filter */}
      <Drawer
        anchor="left"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 320,
            padding: "16px",
          },
        }}
      >
        <Box className="flex items-center justify-between mb-3">
          <Typography variant="h6" component="h2">
            Categories
          </Typography>
          <IconButton
            onClick={() => setOpenFilter(false)}
            aria-label="close filter"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <ProductsFilter categories={categories} />
      </Drawer>
    </>
  );
}
