"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { 
  MessageCircle, 
  Send, 
  Loader2, 
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Check
} from "lucide-react";
import { addComment, deleteComment, updateComment } from "@/app/recipes/interactions";
import type { CommentWithAuthor } from "@/lib/types";

interface CommentsSectionProps {
  recipeId: string;
  initialComments: CommentWithAuthor[];
  currentUserId?: string;
  isAuthenticated: boolean;
}

export function CommentsSection({ 
  recipeId, 
  initialComments, 
  currentUserId,
  isAuthenticated 
}: CommentsSectionProps) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push("/login?redirect=" + encodeURIComponent(`/recipes/${recipeId}`));
      return;
    }

    if (!newComment.trim()) return;

    startTransition(async () => {
      const result = await addComment(recipeId, newComment);
      
      if (result.success && result.comment) {
        setComments(prev => [result.comment!, ...prev]);
        setNewComment("");
      }
    });
  };

  const handleDelete = (commentId: string) => {
    startTransition(async () => {
      const result = await deleteComment(commentId);
      
      if (result.success) {
        setComments(prev => prev.filter(c => c.id !== commentId));
      }
    });
    setMenuOpenId(null);
  };

  const handleEdit = (comment: CommentWithAuthor) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
    setMenuOpenId(null);
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editContent.trim()) return;

    startTransition(async () => {
      const result = await updateComment(commentId, editContent);
      
      if (result.success) {
        setComments(prev => prev.map(c => 
          c.id === commentId 
            ? { ...c, content: editContent.trim(), updated_at: new Date().toISOString() }
            : c
        ));
        setEditingId(null);
        setEditContent("");
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Az önce";
    if (diffMins < 60) return `${diffMins} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
      <h2 className="font-display text-xl font-semibold text-charcoal-800 mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Yorumlar ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isAuthenticated ? "Yorumunuzu yazın..." : "Yorum yapmak için giriş yapın"}
              disabled={!isAuthenticated || isPending}
              rows={3}
              maxLength={1000}
              className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-charcoal-700/50">
                {newComment.length}/1000
              </span>
              <button
                type="submit"
                disabled={!newComment.trim() || isPending || !isAuthenticated}
                className="flex items-center gap-2 px-4 py-2 bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-terracotta-500/50 text-cream-50 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Gönder
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-charcoal-700/50">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Henüz yorum yok. İlk yorumu siz yapın!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const authorName = comment.profiles?.full_name || comment.profiles?.username || "Anonim";
            const isOwner = currentUserId === comment.user_id;
            const isEditing = editingId === comment.id;
            const isEdited = comment.updated_at !== comment.created_at;

            return (
              <div
                key={comment.id}
                className="flex gap-3 p-4 bg-cream-50 rounded-xl"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta-500 flex items-center justify-center text-cream-50 font-medium text-sm">
                  {authorName.slice(0, 2).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-charcoal-800 truncate">
                        {authorName}
                      </span>
                      <span className="text-xs text-charcoal-700/50">
                        {formatDate(comment.created_at)}
                        {isEdited && " (düzenlendi)"}
                      </span>
                    </div>

                    {/* Actions Menu */}
                    {isOwner && !isEditing && (
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpenId(menuOpenId === comment.id ? null : comment.id)}
                          className="p-1 text-charcoal-700/40 hover:text-charcoal-700 rounded transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {menuOpenId === comment.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10"
                              onClick={() => setMenuOpenId(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 bg-white border border-cream-200 rounded-lg shadow-lg z-20 py-1 min-w-[120px]">
                              <button
                                onClick={() => handleEdit(comment)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-charcoal-700 hover:bg-cream-50 transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                                Düzenle
                              </button>
                              <button
                                onClick={() => handleDelete(comment.id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                Sil
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Comment Content or Edit Form */}
                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        maxLength={1000}
                        className="w-full px-3 py-2 bg-white border border-cream-200 rounded-lg text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveEdit(comment.id)}
                          disabled={!editContent.trim() || isPending}
                          className="flex items-center gap-1 px-3 py-1.5 bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-cream-50 rounded-lg text-sm font-medium transition-colors"
                        >
                          {isPending ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                          Kaydet
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditContent("");
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-cream-200 hover:bg-cream-300 text-charcoal-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          <X className="w-3 h-3" />
                          İptal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-charcoal-700 whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
