import React, { useState, useEffect } from "react";
import { Slider, Space } from "antd";
import type { InputNumberProps } from "antd";

export type MapControlInputType = {
  pointSize: number;
};

interface Props {
  onInputChange: (input: MapControlInputType) => void;
}

const MapControl: React.FC<Props> = (props) => {
  const [pointSize, setPointSize] = useState(1);

  const { onInputChange } = props;

  const handlePointSizeChanged: InputNumberProps["onChange"] = (newValue) => {
    setPointSize(newValue as number);
  };

  useEffect(() => {
    onInputChange({ pointSize });
  }, [pointSize, onInputChange]);

  return (
    <Space
      style={{ width: "500px", backgroundColor: "#b0b0b04d", padding: "16px" }}
    >
      <h4 style={{ color: "#7b7b7b" }}>Point Size</h4>
      <Slider
        min={1}
        max={20}
        onChange={handlePointSizeChanged}
        value={typeof pointSize === "number" ? pointSize : 0}
      />
    </Space>
  );
};

export default MapControl;
