"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import { 
  User, 
  Mail, 
  FileText, 
  Check, 
  X, 
  Loader2,
  AtSign
} from "lucide-react";
import { updateProfile, checkUsernameAvailability } from "@/app/profile/actions";
import type { Profile } from "@/lib/types";

interface ProfileFormProps {
  profile: Profile;
  email: string;
  onSuccess?: () => void;
}

export function ProfileForm({ profile, email, onSuccess }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [username, setUsername] = useState(profile.username || "");
  const [fullName, setFullName] = useState(profile.full_name || "");
  const [bio, setBio] = useState(profile.bio || "");
  
  // Username availability
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  // Debounced username check
  const checkUsername = useCallback(async (value: string) => {
    if (!value || value === profile.username) {
      setUsernameStatus("idle");
      setUsernameError(null);
      return;
    }

    if (value.length < 3) {
      setUsernameStatus("invalid");
      setUsernameError("En az 3 karakter olmalı");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(value)) {
      setUsernameStatus("invalid");
      setUsernameError("Sadece harf, rakam ve alt çizgi kullanabilirsiniz");
      return;
    }

    setUsernameStatus("checking");
    setUsernameError(null);

    const result = await checkUsernameAvailability(value);
    
    if (result.success) {
      setUsernameStatus("available");
      setUsernameError(null);
    } else {
      setUsernameStatus("taken");
      setUsernameError(result.error || "Bu kullanıcı adı alınmış");
    }
  }, [profile.username]);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkUsername(username);
    }, 500);

    return () => clearTimeout(timer);
  }, [username, checkUsername]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (usernameStatus === "taken" || usernameStatus === "invalid") {
      setError("Lütfen geçerli bir kullanıcı adı girin");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("full_name", fullName);
    formData.append("bio", bio);

    startTransition(async () => {
      const result = await updateProfile(formData);
      
      if (result.success) {
        setSuccess(true);
        onSuccess?.();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Bir hata oluştu");
      }
    });
  };

  const hasChanges = 
    username !== (profile.username || "") ||
    fullName !== (profile.full_name || "") ||
    bio !== (profile.bio || "");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-sage-500/10 border border-sage-500/20 rounded-xl text-sage-600">
          <Check className="w-5 h-5 flex-shrink-0" />
          <p>Profiliniz başarıyla güncellendi!</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
          <X className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Email (Read-only) */}
      <div>
        <label className="block text-sm font-medium text-charcoal-700 mb-2">
          E-posta
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
          <input
            type="email"
            value={email}
            disabled
            className="w-full pl-12 pr-4 py-3 bg-cream-100 border border-cream-200 rounded-xl text-charcoal-700/60 cursor-not-allowed"
          />
        </div>
        <p className="mt-1.5 text-xs text-charcoal-700/50">
          E-posta adresi değiştirilemez
        </p>
      </div>

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-charcoal-700 mb-2">
          Kullanıcı Adı
        </label>
        <div className="relative">
          <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            placeholder="kullanici_adi"
            maxLength={20}
            className={`w-full pl-12 pr-12 py-3 bg-white border rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 transition-colors ${
              usernameStatus === "available" 
                ? "border-sage-500 focus:ring-sage-500/20" 
                : usernameStatus === "taken" || usernameStatus === "invalid"
                ? "border-red-400 focus:ring-red-500/20"
                : "border-cream-200 focus:ring-terracotta-500/20 focus:border-terracotta-500"
            }`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {usernameStatus === "checking" && (
              <Loader2 className="w-5 h-5 text-charcoal-700/40 animate-spin" />
            )}
            {usernameStatus === "available" && (
              <Check className="w-5 h-5 text-sage-500" />
            )}
            {(usernameStatus === "taken" || usernameStatus === "invalid") && (
              <X className="w-5 h-5 text-red-500" />
            )}
          </div>
        </div>
        {usernameError && (
          <p className="mt-1.5 text-xs text-red-500">{usernameError}</p>
        )}
        {usernameStatus === "available" && (
          <p className="mt-1.5 text-xs text-sage-600">Bu kullanıcı adı müsait!</p>
        )}
        {usernameStatus === "idle" && (
          <p className="mt-1.5 text-xs text-charcoal-700/50">
            3-20 karakter, sadece harf, rakam ve alt çizgi
          </p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-charcoal-700 mb-2">
          Ad Soyad
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
          <input
            id="full_name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Adınız Soyadınız"
            maxLength={100}
            className="w-full pl-12 pr-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-charcoal-700 mb-2">
          Biyografi
        </label>
        <div className="relative">
          <FileText className="absolute left-4 top-4 w-5 h-5 text-charcoal-700/40" />
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Kendinizden bahsedin..."
            maxLength={500}
            rows={4}
            className="w-full pl-12 pr-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors resize-none"
          />
        </div>
        <p className="mt-1.5 text-xs text-charcoal-700/50 text-right">
          {bio.length}/500
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending || !hasChanges || usernameStatus === "taken" || usernameStatus === "invalid"}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-terracotta-500/50 disabled:cursor-not-allowed text-cream-50 rounded-xl font-medium transition-colors"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Değişiklikleri Kaydet
            </>
          )}
        </button>

        {hasChanges && !isPending && (
          <p className="text-sm text-charcoal-700/60">
            Kaydedilmemiş değişiklikler var
          </p>
        )}
      </div>
    </form>
  );
}
