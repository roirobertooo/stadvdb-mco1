import React from "react";

function Report1_1() {
  return (
    <div className="py-16 border-b">
      <h1>Report 1_1</h1>
    </div>
  );
}

function Report1_2() {
  return (
    <div className="py-16 border-b">
      <h1>Report 1_2</h1>
    </div>
  );
}

function Report1_3() {
  return (
    <div className="py-16 border-b">
      <h1>Report 1_3</h1>
    </div>
  );
}

function Report1_4() {
  return (
    <div className="py-16">
      <h1>Report 1_4</h1>
    </div>
  );
}

export default function Report1() {
  return (
    <div className="w-3/4 flex flex-col self-center p-3">
      <div className="font-bold text-3xl">Overview</div>
      <div className="container mx-auto">
        <Report1_1/>
        <Report1_2/>
        <Report1_3/>
        <Report1_4/>
      </div>
    </div>
  );
}