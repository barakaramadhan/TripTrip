import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { updateDisplayName, signOut } from "../../services/tripService";

export default function SettingsPage() {
  const { user, name } = useOutletContext();
  const navigate = useNavigate();
  const [value, setValue] = useState(name);
  const [msg, setMsg] = useState("");

  const save = async (e) => {
    e.preventDefault();
    try {
      await updateDisplayName(value);
      setMsg("Tersimpan. Nama di sidebar akan ikut berubah.");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-md font-satoshi">
      <h1 className="font-switzer font-bold text-4xl">Settings</h1>
      <form onSubmit={save} className="space-y-3">
        <label className="block text-sm">Nama tampilan
          <input value={value} onChange={(e) => setValue(e.target.value)} minLength={2} required className="bg-whitebright mt-1 px-4 py-3 border border-secondarySage rounded-2xl w-full" />
        </label>
        <p className="text-textLabel text-sm">Email: {user.email}</p>
        <button className="bg-accentSend px-6 py-2.5 rounded-full font-semibold cursor-pointer">Simpan</button>
        {msg && <p className="text-sm" role="status">{msg}</p>}
      </form>
      <button onClick={async () => { await signOut(); navigate("/"); }} className="hover:bg-red-50 px-6 py-2.5 border border-red-200 rounded-full text-red-700 cursor-pointer">Sign out</button>
    </div>
  );
}
