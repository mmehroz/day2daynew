import { Select } from "@uiUtils";
import { memo } from "react";
import SidebarTabs from "./SidebarTabs";

function EliquidsFilters() {
  return (
    <>
      {/* Combo Packs*/}
      <div className="w-full h-1 border-b" />
      <SidebarTabs title="Combo Packs">
        <div className="mt-8 flex flex-col h-40 w-full text-primaryText overflow-y-scroll gap-4">
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Yes</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">No</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Sub-Ohm Kits</h2>
          </div>
        </div>
      </SidebarTabs>

      {/* Volume  */}
      <div className="w-full h-1 border-b" />
      <SidebarTabs title="Volume">
        <div className="mt-8 flex flex-col h-40 w-full text-primaryText overflow-y-scroll gap-4">
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">30mL</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">31.5mL</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">45mL</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">60mL</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">75mL</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">90mL</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">100 mL</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">120 mL</h2>
          </div>
        </div>
      </SidebarTabs>

      {/* Nicotine Strength  */}
      <div className="w-full h-1 border-b" />
      <SidebarTabs title="Nicotine Strength">
        <div className="mt-8 flex flex-col h-40 w-full text-primaryText overflow-y-scroll gap-4">
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">0mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">3mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">6mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">12mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">18mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">22mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">22mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">24mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">30mg</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">36mg</h2>
          </div>
        </div>
      </SidebarTabs>

      {/* Blend Ratio */}
      <div className="w-full h-1 border-b" />
      <SidebarTabs title="Blend Ratio">
        <div className="mt-8 flex flex-col h-40 w-full text-primaryText overflow-y-scroll gap-4">
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Max VG</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">100VG</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">85VG/15PG</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">80VG/20PG</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">75VG/25PG</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">70VG/30PG</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">65VG/35PG</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">60VG/40PG</h2>
          </div>
        </div>
      </SidebarTabs>

      {/* Flavor Profile  */}
      <div className="w-full h-1 border-b" />
      <SidebarTabs title="Flavor Profile">
        <div className="mt-8 flex flex-col h-40 w-full text-primaryText overflow-y-scroll gap-4">
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Fruit</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Menthol & Mint</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Bakery</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Custard & Cream</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Candy</h2>
          </div>
          <div className="w-full flex items-center gap-4">
            <Select />
            <h2 className="font-primary text-sx uppercase">Dessert</h2>
          </div>
        </div>
      </SidebarTabs>
    </>
  );
}

export default memo(EliquidsFilters);
