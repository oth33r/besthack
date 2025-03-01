import * as React from "react";
import { useState } from "react";
import { Layout, Row, Col, Select, Space, Button, Progress, List } from "antd";
import { useQuery } from "react-query";
import "./MarketplacePage.scss";

const { Sider, Content } = Layout;
const { Option } = Select;

interface Lot {
  id: number;
  lotNumber: number;
  fuelType: string;
  oilBaseName: string;
  region: string;
  date: string;
  pricePerTon: number;
  availableVolume: number;
}

// Тестовые данные
const testData: Lot[] = [
  {
    id: 1,
    lotNumber: 101,
    fuelType: "АИ-95",
    oilBaseName: "Нефтебаза_1",
    region: "Центр",
    date: "2025-03-01",
    pricePerTon: 55000,
    availableVolume: 12000,
  },
  {
    id: 2,
    lotNumber: 102,
    fuelType: "ДТ",
    oilBaseName: "Нефтебаза_2",
    region: "Север",
    date: "2025-03-01",
    pricePerTon: 48000,
    availableVolume: 15000,
  },
  {
    id: 3,
    lotNumber: 103,
    fuelType: "АИ-92",
    oilBaseName: "Нефтебаза_3",
    region: "Юг",
    date: "2025-03-01",
    pricePerTon: 50000,
    availableVolume: 9000,
  },
  {
    id: 4,
    lotNumber: 104,
    fuelType: "АИ-95 Экто",
    oilBaseName: "Нефтебаза_1",
    region: "Центр",
    date: "2025-03-01",
    pricePerTon: 57000,
    availableVolume: 11000,
  },
];

// Компонент карточки лота
const LotCard: React.FC<{
  lot: Lot;
  onBuy: (lot: Lot) => void; // коллбэк для добавления в корзину
  maxVolume?: number;
}> = ({ lot, onBuy, maxVolume = 15000 }) => {
  // Процент оставшегося топлива
  const progress = Math.min((lot.availableVolume / maxVolume) * 100, 100);

  // цвет прогресса
  let progressColor = "#00B050"; // зелёный
  if (progress < 50) {
    progressColor = "#FF0000"; // красный
  } else if (progress < 80) {
    progressColor = "#FFC107"; // жёлтый
  }

  return (
    <div className="lot-card">
      <div className="card-cover">
        <img
          className="card-image"
          alt="Fuel"
          src="./src/shared/assets/barrel-image.jpeg"
        />
        <Progress
          type="circle"
          percent={Math.round(progress)}
          format={(percent) =>
            percent === 100 ? (
              <span style={{ color: "black" }}>{percent}%</span>
            ) : (
              <span>{percent}%</span>
            )
          }
          width={40}
          strokeColor={progressColor}
          trailColor="rgba(255, 255, 255, 0.2)"
          className="circular-progress"
        />
      </div>
      <div className="card-content">
        <h3>Lot #{lot.lotNumber}</h3>
        <p>
          <strong>Fuel:</strong> {lot.fuelType}
        </p>
        <p>
          <strong>Oil Base:</strong> {lot.oilBaseName}
        </p>
        <p>
          <strong>Region:</strong> {lot.region}
        </p>
      </div>
      <div className="card-overlay">
        <p>
          <strong>Date:</strong> {lot.date}
        </p>
        <p>
          <strong>Price/ton:</strong>{" "}
          <span style={{ color: "#AC4BC1" }}>
            {lot.pricePerTon.toLocaleString("ru-RU")} ₽
          </span>
        </p>
        <p>
          <strong>Available:</strong>{" "}
          {lot.availableVolume.toLocaleString("ru-RU")} L
        </p>
        <Button
          type="primary"
          onClick={() => onBuy(lot)}
          className="buy-button"
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export const MarketplacePage: React.FC = () => {
  // Состояния фильтров
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string | undefined>();
  const [regionFilter, setRegionFilter] = useState<string | undefined>();
  const [oilBaseFilter, setOilBaseFilter] = useState<string | undefined>();

  // Состояние корзины
  const [cart, setCart] = useState<Lot[]>([]);

  const handleAddToCart = (lot: Lot) => {
    setCart((prev) => [...prev, lot]);
  };

  const handleRemoveFromCart = (lotId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== lotId));
  };

  const { data: lots, isLoading, isError } = useQuery<Lot[]>("lots", fetchLots);
  async function fetchLots() {
    return new Promise<Lot[]>((resolve) => {
      setTimeout(() => resolve(testData), 1000);
    });
  }

  const filteredLots = lots?.filter((lot) => {
    return (
      (!fuelTypeFilter || lot.fuelType === fuelTypeFilter) &&
      (!regionFilter || lot.region === regionFilter) &&
      (!oilBaseFilter || lot.oilBaseName === oilBaseFilter)
    );
  });

  const fuelTypes = Array.from(new Set(testData.map((lot) => lot.fuelType)));
  const regions = Array.from(new Set(testData.map((lot) => lot.region)));
  const oilBases = Array.from(new Set(testData.map((lot) => lot.oilBaseName)));

  return (
    <Layout className="marketplace-layout">
      <Sider width={250} className="left-sider">
        <div className="filters-title">Фильтры</div>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Select
            placeholder="Fuel Type"
            style={{ width: "100%" }}
            allowClear
            value={fuelTypeFilter}
            onChange={(value) => setFuelTypeFilter(value)}
          >
            {fuelTypes.map((ft) => (
              <Option key={ft} value={ft}>
                {ft}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Region"
            style={{ width: "100%" }}
            allowClear
            value={regionFilter}
            onChange={(value) => setRegionFilter(value)}
          >
            {regions.map((r) => (
              <Option key={r} value={r}>
                {r}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Oil Base"
            style={{ width: "100%" }}
            allowClear
            value={oilBaseFilter}
            onChange={(value) => setOilBaseFilter(value)}
          >
            {oilBases.map((ob) => (
              <Option key={ob} value={ob}>
                {ob}
              </Option>
            ))}
          </Select>
          <Button
            onClick={() => {
              setFuelTypeFilter(undefined);
              setRegionFilter(undefined);
              setOilBaseFilter(undefined);
            }}
          >
            Clear Filters
          </Button>
        </Space>
      </Sider>

      <Layout>
        <Content className="marketplace-content">
          <h1 className="marketplace-title">Fuel Marketplace</h1>
          {isLoading && <p>Loading lots...</p>}
          {isError && <p>Error loading lots!</p>}

          {!isLoading && !isError && (
            <Row gutter={[16, 16]}>
              {filteredLots?.map((lot) => (
                <Col key={lot.id} xs={24} sm={12} md={8} lg={6}>
                  <LotCard lot={lot} onBuy={handleAddToCart} />
                </Col>
              ))}
            </Row>
          )}
        </Content>
      </Layout>

      <Sider width={250} className="right-sider">
        <div className="account-section">
          <h3>Мой аккаунт</h3>
          <p>Здравствуйте, UserName</p>
          <p>Статус: Premium</p>
        </div>
        <div className="cart-section">
          <h3>Моя корзина</h3>
          <List
            dataSource={cart}
            locale={{ emptyText: "Корзина пуста" }}
            renderItem={(item) => (
              <List.Item
                className="cart-item"
                actions={[
                  <Button
                    type="link"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                Lot #{item.lotNumber} – {item.fuelType}
              </List.Item>
            )}
          />
        </div>
      </Sider>
    </Layout>
  );
};
