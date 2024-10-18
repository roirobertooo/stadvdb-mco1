import React from "react";

function Report2_1() {
  return (
    <div className="py-16 border-b">
      <h1>Report 2_1</h1>
    </div>
  );
}

function Report2_2() {
  return (
    <div className="py-16 border-b">
      <h1>Report 2_2</h1>
    </div>
  );
}

function Report2_3() {
  return (
    <div className="py-16 border-b">
      <h1>Report 2_3</h1>
    </div>
  );
}

function Report2_4() {
  return (
    <div className="py-16">
      <h1>Report 2_4</h1>
    </div>
  );
}

export default function Report2() {
  return (
    <div className="w-3/4 flex flex-col self-center p-3">
      <div className="font-bold text-3xl">Overview</div>
      <div className="container mx-auto">
        <Report2_1/>
        <Report2_2/>
        <Report2_3/>
        <Report2_4/>
      </div>
    </div>
  );
}