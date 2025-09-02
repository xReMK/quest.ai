import React, { useState, useEffect } from "react";
import DashboardCosmosWallpaper from "../animations/DashboardCosmosWallpaper";
import Sidebar from "../pages/Sidebar";
import questLogo from "../assets/quest-ai-blacBG.png";

// Dummy dropdown values
const DROPDOWN_OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

// Dummy card data placeholders
const CARD_DATA = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    time: "4 days ago",
    title: "Post One",
    body: "This is a dynamic card body. You can change this text.",
    reads: 7,
    views: 3224,
    comments: 21,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    time: "1 week ago",
    title: "Post Two",
    body: "Another dynamic card body. Change this as needed.",
    reads: 11,
    views: 1699,
    comments: 27,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    time: "4 weeks ago",
    title: "Post Three",
    body: "Yet another card body. All elements are dynamic.",
    reads: 4,
    views: 1624,
    comments: 17,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    time: "2 days ago",
    title: "Post Four",
    body: "Change this card's content as you wish.",
    reads: 9,
    views: 2100,
    comments: 12,
  },
];

// Search box with dropdown
function SearchBox({ onSearch, selectedCards, onRemoveChip }) {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(DROPDOWN_OPTIONS[0]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, selectedOption);
      setQuery("");
    }
  };

  // Chips layout logic
  const maxChips = 5;
  const chips = selectedCards.slice(0, maxChips);
  const chipWidth = 120;
  const boxWidth = 700;
  const startOffset = (boxWidth - Math.min(chips.length, maxChips) * chipWidth) / 2;

  return (
    <div style={{ width: boxWidth, margin: "0 auto", position: "relative" }}>
      <form
        className="dashboard-search-box"
        style={{
          width: "100%",
          background: "#232428",
          borderRadius: "1.5rem",
          boxShadow: "0 2px 16px #000a",
          padding: "0.8rem 2.2rem",
          display: "flex",
          alignItems: "center",
          position: "relative",
          minHeight: "64px",
        }}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Begin your quest"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: "1.18rem",
            padding: "0.6rem 0",
          }}
          onKeyDown={e => {
            if (e.key === "Enter") handleSearch(e);
          }}
        />
        <div style={{ position: "relative", marginLeft: "1rem" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#18191c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: dropdownOpen ? "0 0 0 2px #38f9d7" : "none",
              transition: "box-shadow 0.18s",
              border: "1.5px solid #232428",
            }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <polygon points="6,9 12,15 18,9" />
            </svg>
          </div>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "110%",
                background: "#232428",
                borderRadius: "0.7rem",
                boxShadow: "0 2px 8px #000a",
                padding: "0.5rem 0",
                minWidth: 120,
                zIndex: 10,
              }}
            >
              {DROPDOWN_OPTIONS.map(opt => (
                <div
                  key={opt}
                  style={{
                    padding: "0.5rem 1rem",
                    color: "#fff",
                    cursor: "pointer",
                    background: selectedOption === opt ? "#18191c" : "transparent",
                    fontWeight: selectedOption === opt ? 600 : 400,
                  }}
                  onClick={() => {
                    setSelectedOption(opt);
                    setDropdownOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
      {/* Chips below search box */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: startOffset,
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "0.7rem",
          marginLeft: "-2.7rem",
          height: chipWidth,
          pointerEvents: "none",
        }}
      >
        {chips.map((title, idx) => (
          <div
            key={title}
            style={{
              minWidth: chipWidth - 10,
              maxWidth: chipWidth,
              background: "#18191c",
              color: "#fff",
              borderRadius: "1.2rem",
              boxShadow: "0 2px 8px #000a",
              border: "1.5px solid #232428",
              padding: "0.5rem 1.2rem",
              marginRight: "0.5rem",
              fontWeight: 600,
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              pointerEvents: "auto",
              transition: "background 0.18s, border-color 0.18s",
            }}
          >
            {title}
            <span
              style={{
                marginLeft: "0.7rem",
                cursor: "pointer",
                color: "#38f9d7",
                fontWeight: 700,
                fontSize: "1.1rem",
                pointerEvents: "auto",
              }}
              onClick={() => onRemoveChip(title)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Card component
function DashboardCard({ card, selected, onClick }) {
  return (
    <div
      className="dashboard-card"
      style={{
        width: 220,
        height: 350,
        background: "#18191c",
        borderRadius: "1.2rem",
        boxShadow: selected
          ? "0 0 0 3px #38f9d7, 0 2px 16px #000a"
          : "0 2px 16px #000a",
        border: selected ? "2px solid #38f9d7" : "2px solid transparent",
        transition: "box-shadow 0.18s, border-color 0.18s",
        cursor: "pointer",
        margin: "0 1.2rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
      onClick={() => onClick(card.id)}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow =
          "0 0 0 3px #fff, 0 2px 16px #000a";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = selected
          ? "0 0 0 3px #38f9d7, 0 2px 16px #000a"
          : "0 2px 16px #000a";
      }}
    >
      <img
        src={card.image}
        alt={card.title}
        style={{
          width: "100%",
          height: 120,
          objectFit: "cover",
          borderTopLeftRadius: "1.2rem",
          borderTopRightRadius: "1.2rem",
        }}
      />
      <div style={{ padding: "1.1rem 1.2rem", background: "#18191c" }}>
        <div style={{ color: "#38f9d7", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>
          {card.time}
        </div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", marginBottom: 8 }}>
          {card.title}
        </div>
        <div style={{ color: "#bfc2c7", fontSize: "0.98rem", marginBottom: 12 }}>
          {card.body}
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
        }}>
          <div style={{ color: "#fff", fontSize: "0.95rem" }}>
            <span style={{ fontWeight: 600 }}>{card.reads}</span> Reads
          </div>
          <div style={{ color: "#fff", fontSize: "0.95rem" }}>
            <span style={{ fontWeight: 600 }}>{card.views}</span> Views
          </div>
          <div style={{ color: "#fff", fontSize: "0.95rem" }}>
            <span style={{ fontWeight: 600 }}>{card.comments}</span> Comments
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "4.5rem",
      marginBottom: "2.2rem",
      zIndex: 2,
      position: "absolute"
    }}>
      <p
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          textAlign: "center",
          margin: 80
        }}
      >quest.ai</p>
    </div>
  );
}

export default function Dashboard() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  // Handle card selection/deselection
  const handleCardClick = (id) => {
    setSelectedCards(prev => {
      const card = CARD_DATA.find(c => c.id === id);
      if (!card) return prev;
      const titles = prev.map(cid => {
        const c = CARD_DATA.find(card => card.id === cid);
        return c ? c.title : "";
      });
      if (prev.includes(id)) {
        // Remove
        return prev.filter(cardId => cardId !== id);
      } else {
        // Add, max 5
        if (prev.length < 5) return [...prev, id];
        else return prev;
      }
    });
  };

  // Remove chip by title
  const handleRemoveChip = (title) => {
    setSelectedCards(prev =>
      prev.filter(cardId => {
        const c = CARD_DATA.find(card => card.id === cardId);
        return c && c.title !== title;
      })
    );
  };

  // Dummy search handler
  const handleSearch = async (query, option) => {
    setSearchResults(`You searched for "${query}" with "${option}"`);
  };

  // Get selected card titles for chips
  const selectedTitles = selectedCards.map(id => {
    const card = CARD_DATA.find(c => c.id === id);
    return card ? card.title : "";
  });

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <DashboardCosmosWallpaper />
      <Sidebar />
      <div style={{
        marginLeft: 250,
        position: "relative",
        zIndex: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <DashboardHeader />
        <div style={{ marginTop: "15rem", marginBottom: "-5rem" }}>
          <SearchBox
            onSearch={handleSearch}
            selectedCards={selectedTitles}
            onRemoveChip={handleRemoveChip}
          />
        </div>
        {searchResults && (
          <div style={{
            color: "#fff",
            background: "#232428",
            borderRadius: "1rem",
            margin: "1.5rem auto",
            width: 700,
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            boxShadow: "0 2px 16px #000a",
            textAlign: "center",
          }}>
            {searchResults}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "1.5rem",
            marginTop: "14.5rem",
            flexWrap: "wrap",
            width: 1300,
            maxWidth: "90vw",
          }}
        >
          {CARD_DATA.map(card => (
            <DashboardCard
              key={card.id}
              card={card}
              selected={selectedCards.includes(card.id)}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}