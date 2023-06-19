import { Tabs } from "antd";
import { useRef, useState, useContext} from "react";
import PracticeTable from "./practiceTable";
import Button from '@mui/material/Button';
import AuthContext from '../../shared/context/auth-context';
const initialItems = [
  {
    label: "Tab 1",
    children: <PracticeTable />,
    key: "1",
  },
];

const DashBoardPage = () => {
  const auth = useContext(AuthContext);
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    //todo useBackend
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "New Tab",
      children: <PracticeTable tabKey={newActiveKey} />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div>
     
       <PracticeTable></PracticeTable>
    </div>
   
  )
  //todo 后续改成TAB制
  return (
    <>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
      <button></button>
    </>
  );
};

export default DashBoardPage;
