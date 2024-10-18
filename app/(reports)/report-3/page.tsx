import React from "react";

function Report3_1() {
  return (
    <div className="py-16 border-b">
      <h1>Report 3_1</h1>
    </div>
  );
}

function Report3_2() {
  return (
    <div className="py-16 border-b">
      <h1>Report 3_2</h1>
    </div>
  );
}

function Report3_3() {
  return (
    <div className="py-16 border-b">
      <h1>Report 3_3</h1>
    </div>
  );
}

function Report3_4() {
  return (
    <div className="py-16">
      <h1>Report 3_4</h1>
    </div>
  );
}

export default function Report3() {
  return (
    <div className="w-3/4 flex flex-col self-center p-3">
      <div className="font-bold text-3xl">Overview</div>
      <div className="container mx-auto">
        <Report3_1/>
        <Report3_2/>
        <Report3_3/>
        <Report3_4/>
      </div>
    </div>
  );
}