import React from "react";

function Report4_1() {
  return (
    <div className="py-16 border-b">
      <h1>Report 4_1</h1>
    </div>
  );
}

function Report4_2() {
  return (
    <div className="py-16 border-b">
      <h1>Report 4_2</h1>
    </div>
  );
}

function Report4_3() {
  return (
    <div className="py-16 border-b">
      <h1>Report 4_3</h1>
    </div>
  );
}

function Report4_4() {
  return (
    <div className="py-16">
      <h1>Report 4_4</h1>
    </div>
  );
}

export default function Report4() {
  return (
    <div className="w-3/4 flex flex-col self-center p-3">
      <div className="font-bold text-3xl">Overview</div>
      <div className="container mx-auto">
        <Report4_1/>
        <Report4_2/>
        <Report4_3/>
        <Report4_4/>
      </div>
    </div>
  );
}